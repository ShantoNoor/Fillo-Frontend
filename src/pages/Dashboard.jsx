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

const tasks = [
  {
    id: 1,
    title: "Update Marketing Presentation",
    description:
      "Revise and enhance the marketing presentation with updated statistics, new visuals, and improved content structure.",
    deadline: "2023-01-15",
    priority: "High",
    status: "ongoing",
  },
  {
    id: 2,
    title: "Conduct Customer Feedback Survey",
    description:
      "Develop a customer survey to gather feedback on recent product updates and overall satisfaction. Analyze results for actionable insights.",
    deadline: "2023-02-05",
    priority: "Moderate",
    status: "ongoing",
  },
  {
    id: 3,
    title: "Revamp Company Website Homepage",
    description:
      "Redesign the homepage layout, optimize for mobile responsiveness, and incorporate new branding elements for an enhanced user experience.",
    deadline: "2023-03-10",
    priority: "High",
    status: "ongoing",
  },
  {
    id: 4,
    title: "Organize Team Building Event",
    description:
      "Plan and coordinate a team-building activity to boost team morale and foster collaboration. Research and book suitable venues/activities.",
    deadline: "2023-04-20",
    priority: "Moderate",
    status: "to_do",
  },
  {
    id: 5,
    title: "Review Quarterly Financial Reports",
    description:
      "Analyze and assess financial reports for Q1, highlighting key performance indicators and identifying areas for improvement.",
    deadline: "2023-02-28",
    priority: "High",
    status: "completed",
  },
  {
    id: 6,
    title: "Create Social Media Content Calendar",
    description:
      "Develop a comprehensive social media content calendar for the upcoming quarter. Plan engaging content and schedule posts across platforms.",
    deadline: "2023-03-15",
    priority: "Moderate",
    status: "to_do",
  },
  {
    id: 7,
    title: "Conduct Market Research for New Product Launch",
    description:
      "Gather market data and consumer insights to inform the launch strategy of a new product. Analyze competitors and identify target demographics.",
    deadline: "2023-04-10",
    priority: "High",
    status: "ongoing",
  },
  {
    id: 8,
    title: "Organize Quarterly Performance Review Meetings",
    description:
      "Schedule and coordinate performance review sessions for all departments. Prepare necessary materials and facilitate discussions.",
    deadline: "2023-05-05",
    priority: "Moderate",
    status: "to_do",
  },
  {
    id: 9,
    title: "Develop Training Modules for New Software Rollout",
    description:
      "Create training modules and materials to assist employees in learning a new software system. Design interactive and user-friendly content.",
    deadline: "2023-06-20",
    priority: "High",
    status: "ongoing",
  },
  {
    id: 10,
    title: "Audit and Update Company Policies",
    description:
      "Review existing company policies, identify gaps, and update them to align with current regulations and best practices.",
    deadline: "2023-07-15",
    priority: "Moderate",
    status: "to_do",
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTask, setActiveTask] = useState(null);

  const [todo, setTodo] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [complete, setComplete] = useState([]);

  useEffect(() => {
    setTodo(tasks.filter((task) => task.status === "to_do"));
    setOngoing(tasks.filter((task) => task.status === "ongoing"));
    setComplete(tasks.filter((task) => task.status === "completed"));
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
            <TaskContainer id="todo" text="Todo" tasks={todo} />
            <TaskContainer id="ongoing" text="Ongoing" tasks={ongoing} />
            <TaskContainer id="complete" text="Completed" tasks={complete} />
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
    // console.log(event.active.data.current.task);
  }

  function handleDragOver(event) {
    console.log("over:", event);
  }

  function handleDragEnd(event) {
    console.log("end:", event);
  }
};

export default Dashboard;

const TaskContainer = ({ id, text, tasks }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const ids = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

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

        <SortableContext
          id={id}
          items={ids}
          strategy={verticalListSortingStrategy}
        >
          <Box
            ref={setNodeRef}
            height={{ xs: "35vh", md: "76vh" }}
            sx={{ overflowX: "hidden", overflowY: "auto" }}
          >
            {tasks.map((task) => (
              <TaskItem task={task} key={task.id} />
            ))}
          </Box>
        </SortableContext>
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
        sx={{ width: "100%", border: "1px solid black", opacity: .5 }}
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
