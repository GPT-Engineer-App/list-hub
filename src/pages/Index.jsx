import { useState } from 'react';
import { Box, Button, Container, Flex, Input, List, ListItem, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); handleAddTask(); }} width="full">
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            borderColor={useColorModeValue('gray.300', 'gray.600')}
          />
          <Button type="submit" colorScheme="blue" ml={2}>Add</Button>
        </Flex>
        <List spacing={3} width="full">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md">
              <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
              <Flex>
                <Button onClick={() => handleCompleteTask(task.id)} colorScheme={task.isCompleted ? "green" : "gray"} size="sm" mr={2}>
                  <FaCheckCircle />
                </Button>
                <Button onClick={() => handleDeleteTask(task.id)} colorScheme="red" size="sm">
                  <FaTrash />
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;