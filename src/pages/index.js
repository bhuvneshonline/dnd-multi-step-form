import { 
  Container, 
  Flex,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText, 
  HStack,
  Radio,
  RadioGroup,
  Input,
  Checkbox, 
  CheckboxGroup,
  Stack,
  Textarea,

  List,
  ListItem,
  ListIcon,
  Text,
  Heading,
  IconButton,
} from "@chakra-ui/react";

import { MdList, MdDelete as DeleteIcon, MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import {
  addElementToActiveStep,
} from '../actions/formActions';



import {FormStep} from '../components/FormStep';

const BuilderComponentListItem = ({ name, icon, subHeading }) =>{
  const dispatch = useDispatch();

  return (
    <ListItem padding="0.5rem" borderBottom="1px" borderColor="gray.400">
      <Flex alignItems="center" justifyContent="space-between">
        <ListIcon as={MdList} p="0.5rem" bg="transparent" w="2rem" h="2rem" color="gray.600" borderRadius='.5rem'/>
        <Box w="100%">
          <Text fontWeight="bold" casing="capitalize">
            {name}
          </Text>
          <Text fontSize="sm">
            {subHeading}
          </Text>
        </Box>
        <IconButton onClick={()=>{dispatch(addElementToActiveStep(name))}} p="0.5rem" w="2rem" h="2rem" colorScheme="teal" borderRadius='.5rem' icon={<MdAdd />}></IconButton>
      </Flex>
    </ListItem>
  )
}

const BuilderComponentList = (props) =>{
  const formElements = [{
    name: 'text',
    icon: '',
    subHeading: 'Use this for one liners.'
  },
  {
    name: 'email',
    icon: '',
    subHeading: 'Use this to receive email.'
  },
  {
    name: 'textarea',
    icon: '',
    subHeading: 'Use to received large text'
  },
  {
    name: 'checkboxes',
    icon: '',
    subHeading: 'Use to add checkboxes.'
  },
  {
    name: 'radio',
    icon: '',
    subHeading: 'Use to add radio buttons.'
  }]

  const ListItems = (
    formElements.map((element,index) => {
      return (
        <BuilderComponentListItem 
          name={element.name}
          icon={element.icon}
          subHeading={element.subHeading}
          key={index}
        />
      );
    })
  );

  return (
    <List>
      {ListItems}
    </List>
  )
}

const BuilderSidebar = (props) =>{
  return(
    <Box w="25%" p="1rem" borderRight="1px" borderColor="gray.300">
      <Heading as="h3" fontSize="1rem" pb="1rem" borderBottom="1px" borderColor="gray.400" align="center" fontWeight="bold">Form Sidebar</Heading>
      <BuilderComponentList />
    </Box>
  );
}

export const Index = (props) =>{
  const currentForm = useSelector(state => state.forms.currentForm);
  const {steps,selectedStep,stepsOrder} = currentForm;
  const dispatch = useDispatch();

  return (
    <Container w="90%" maxW="1280px">
      <Flex wrap="wrap" justify="space-between" border="1px" m="1rem" borderColor="gray.300">
        <BuilderSidebar/>
        <Box w="75%" p="2rem" bg="gray.100" minH="100vh">
          <Heading as="h1" mb="1rem" align="center">
            Form Wrap 
          </Heading>
          {
            stepsOrder.map((stepId,index) => {
              const step = steps[stepId];
              const isStepSelected = (selectedStep == stepId) ? true : false;
              return(
                <FormStep 
                  isStepSelected={isStepSelected} 
                  key={index} 
                  index={index}
                  stepId={stepId} 
                  step={step} 
                  currentForm={currentForm} />
              )
            })
          }
        </Box>
      </Flex>
    </Container>
  );
}