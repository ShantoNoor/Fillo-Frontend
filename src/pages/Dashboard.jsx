import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Title from "../components/Title";
import useAuth from "../hooks/useAuth";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useMemo, useState } from "react";

import {
  DndContext,
  DragOverlay,
  rectIntersection,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { axiosn } from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTask, setActiveTask] = useState(null);

  const { data, isPending, error } = useQuery({
    queryKey: ["/tasklists", `user=${user._id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/tasklists?user=${user._id}`);
        return res.data[0];
      } catch (err) {
        console.error(err);
      }
    },
  });

  // eslint-disable-next-line no-unused-vars
  const [todo, setTodo] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [complete, setComplete] = useState([]);

  useEffect(() => {
    if (data?.todo) setTodo(JSON.parse(data?.todo));
    if (data?.ongoing) setOngoing(JSON.parse(data?.ongoing));
    if (data?.complete) setComplete(JSON.parse(data?.complete));
  }, [data]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <Box
      sx={{
        background:
          "linear-gradient(rgba(1, 1, 1, 0.4), rgba(5, 5, 5, 0.7)), url(https://unblast.com/wp-content/uploads/2021/01/Space-Background-Image-5.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Title>{`${user.name} - Dashboard`}</Title>
        <Stack
          direction={{ md: "row" }}
          gap={2}
          py={3}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <TaskContainer
              id="todo"
              text="Todo"
              tasks={todo}
              setTasks={setTodo}
            />
            <TaskContainer
              id="ongoing"
              text="Ongoing"
              tasks={ongoing}
              setTasks={setOngoing}
            />
            <TaskContainer
              id="complete"
              text="complete"
              tasks={complete}
              setTasks={setComplete}
            />
            <DragOverlay>
              {activeTask ? (
                <TaskItem id={activeTask.id} task={activeTask} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </Stack>
      </Container>
    </Box>
  );

  function handleDragStart(event) {
    setActiveTask(event.active.data.current.task);
  }

  function handleDragOver(event) {
    // console.log("over:", event);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = active.data.current.task;
    const overTask = over.data.current.task;

    if (activeTask.status !== overTask?.status) {
      if (
        activeTask.status === "todo" &&
        (overTask?.status === "ongoing" || over?.id === "ongoing")
      ) {
        setTodo((prev) => prev.filter((task) => task.id !== activeTask.id));
        setOngoing([{ ...activeTask, status: "ongoing" }, ...ongoing]);
      } else if (
        activeTask.status === "todo" &&
        (overTask?.status === "complete" || over?.id === "complete")
      ) {
        setTodo((prev) => prev.filter((task) => task.id !== activeTask.id));
        setComplete([{ ...activeTask, status: "complete" }, ...complete]);
      } else if (
        activeTask.status === "ongoing" &&
        (overTask?.status === "todo" || over?.id === "todo")
      ) {
        setOngoing((prev) => prev.filter((task) => task.id !== activeTask.id));
        setTodo([{ ...activeTask, status: "todo" }, ...todo]);
      } else if (
        activeTask.status === "ongoing" &&
        (overTask?.status === "complete" || over?.id === "complete")
      ) {
        setOngoing((prev) => prev.filter((task) => task.id !== activeTask.id));
        setComplete([{ ...activeTask, status: "complete" }, ...complete]);
      } else if (
        activeTask.status === "complete" &&
        (overTask?.status === "todo" || over?.id === "todo")
      ) {
        setComplete((prev) => prev.filter((task) => task.id !== activeTask.id));
        setTodo([{ ...activeTask, status: "todo" }, ...todo]);
      } else if (
        activeTask.status === "complete" &&
        (overTask?.status === "ongoing" || over?.id === "ongoing")
      ) {
        setComplete((prev) => prev.filter((task) => task.id !== activeTask.id));
        setOngoing([{ ...activeTask, status: "ongoing" }, ...ongoing]);
      }
    }
  }

  function handleDragEnd(event) {
    _handleDragEnd_(event);

    // console.log(JSON.stringify(todo));
    // console.log(JSON.stringify(ongoing));
    // console.log(JSON.stringify(complete));

    const toastId = toast.loading("Updating into database ...");
    setTimeout(async () => {
      try {
        await axiosn.put("/tasklists", {
          ongoing: JSON.stringify(ongoing),
          todo: JSON.stringify(todo),
          complete: JSON.stringify(complete),
          user: user._id,
        });

        toast.success("Successfully updated", {
          id: toastId,
        });
      } catch (err) {
        // console.error(err)
        toast.success("Failed to update database.", {
          id: toastId,
        });
      }
    }, 500);
  }

  function _handleDragEnd_(event) {
    // console.log("end:", event);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = active.data.current.task;
    const overTask = over.data.current.task;

    if (activeTask.status === overTask?.status) {
      if (activeTask.status === "todo") {
        setTodo((prev_tasks) => {
          const activeTaskIndex = prev_tasks.findIndex(
            (task) => task.id === activeId
          );

          const overtTaskIndex = prev_tasks.findIndex(
            (task) => task.id === overId
          );

          return arrayMove(prev_tasks, activeTaskIndex, overtTaskIndex);
        });
      } else if (activeTask.status === "complete") {
        setComplete((prev_tasks) => {
          const activeTaskIndex = prev_tasks.findIndex(
            (task) => task.id === activeId
          );

          const overtTaskIndex = prev_tasks.findIndex(
            (task) => task.id === overId
          );

          return arrayMove(prev_tasks, activeTaskIndex, overtTaskIndex);
        });
      } else if (activeTask.status === "ongoing") {
        setOngoing((prev_tasks) => {
          const activeTaskIndex = prev_tasks.findIndex(
            (task) => task.id === activeId
          );

          const overtTaskIndex = prev_tasks.findIndex(
            (task) => task.id === overId
          );

          return arrayMove(prev_tasks, activeTaskIndex, overtTaskIndex);
        });
      }
    }
  }
};

export default Dashboard;

const TaskContainer = ({ id, text, tasks, setTasks }) => {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: "Container",
    },
  });

  // const ids = useMemo(() => {
  //   return tasks?.map((task) => task.id);
  // }, [tasks]);

  return (
    <>
      <Box flex={1} width={"100%"} border="1px solid white" borderRadius={1}>
        <Typography
          variant="h6"
          component="h3"
          textAlign="center"
          py={1}
          sx={{ bgcolor: (theme) => `${theme.palette.primary.main}80` }}
          color="white"
        >
          {text}
        </Typography>

        <Box
          ref={setNodeRef}
          height={{ xs: "35vh", md: "76vh" }}
          sx={{ overflowX: "hidden", overflowY: "auto" }}
        >
          {typeof tasks !== "string" || tasks?.length !== 0 ? (
            <SortableContext
              id={id}
              items={tasks}
              strategy={verticalListSortingStrategy}
            >
              {tasks?.map((task) => (
                <TaskItem task={task} key={task.id} />
              ))}
            </SortableContext>
          ) : (
            <Typography
              pl={3}
              pt={2}
              color={"white"}
              component="h6"
              variant="h6"
            >
              No Tasks Found
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

const TaskItem = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging)
    return (
      <Card
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        sx={{ width: "100%", border: "1px solid black", opacity: 0.5 }}
      >
        <CardContent>
          <Stack
            direction={"row"}
            alignItems={"start"}
            justifyContent={"space-around"}
          >
            <Box flex={1}>
              <DragHandleIcon />
            </Box>
            <Box flex={1}>
              <Typography
                sx={{ fontSize: 14 }}
                color="primary.main"
                gutterBottom
                textAlign={"right"}
              >
                Priority: {task.priority}
              </Typography>
              <Typography
                sx={{ fontSize: 14, color: "red" }}
                color="text.secondary"
                textAlign={"right"}
                gutterBottom
              >
                {task.deadline}
              </Typography>
            </Box>
          </Stack>
          <Typography variant="h5" component="div">
            {task.title}
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="body2">{task.description}</Typography>
        </CardContent>
        <CardActions>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      sx={{ width: "100%", border: "1px solid black" }}
    >
      <CardContent>
        <Stack
          direction={"row"}
          alignItems={"start"}
          justifyContent={"space-around"}
        >
          <Box flex={1}>
            <DragHandleIcon />
          </Box>
          <Box flex={1}>
            <Typography
              sx={{ fontSize: 14 }}
              color="primary.main"
              gutterBottom
              textAlign={"right"}
            >
              Priority: {task.priority}
            </Typography>
            <Typography
              sx={{ fontSize: 14, color: "red" }}
              color="text.secondary"
              textAlign={"right"}
              gutterBottom
            >
              {task.deadline}
            </Typography>
          </Box>
        </Stack>
        <Typography variant="h5" component="div">
          {task.title}
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="body2">{task.description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
