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

import {
  deleteElementFromStep,
  updateSelectedStep,
  addElementToActiveStep,
  moveStepUp,
  moveStepDown,
  deleteStep,
} from '../actions/formActions';

import { useDispatch, useSelector } from "react-redux";
import { MdList, MdDelete as DeleteIcon, MdAdd } from "react-icons/md";



export const FormStep = ({isStepSelected,key,index,stepId,step,currentForm}) => {
  const {steps,selectedStep,stepsOrder} = currentForm;
  const dispatch = useDispatch();


  const handleElementDelete = (stepId,elementId) => {
    dispatch(deleteElementFromStep(stepId,elementId));
  }

  if('undefined' === typeof(stepId)){
    return 'loading..';
  }
  
  return (
    <Box p="1rem" bg="white" mb="1rem" border="1px" borderColor="gray.400">
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Heading as="h2" size="md">{step.title}</Heading>
        <Box>
        <ButtonGroup variant="outline" spacing="6">
          {(0 !== parseInt(index)) && <Button onClick={()=>{dispatch(moveStepUp(stepId))}} colorScheme="blue">Up</Button>}
          {((Object.keys(stepsOrder).length - 1) !== parseInt(index)) && <Button onClick={()=>{dispatch(moveStepDown(stepId))}}>Down</Button>}
          <IconButton onClick={()=>{dispatch(deleteStep(stepId))}} icon={<DeleteIcon />}>Delete</IconButton>
          <Button onClick={()=>{dispatch(updateSelectedStep(stepId))}} colorScheme={isStepSelected ? 'green' : ''} >{isStepSelected ? 'Active' : 'Select Layer'}</Button>
        </ButtonGroup>
        </Box>
      </Flex>
      <form>
        {
          step.elements_order.map((elementId,index)=>{
            const element = currentForm.elements[elementId];

            if(element.type === "checkboxes"){
              return (
                <FormControl as="fieldset" pb="1rem">
                  <Flex alignItems="flex-start">
                    <FormLabel color="gray.600" fontWeight="bold">{element.label}</FormLabel>
                    <IconButton onClick={()=>{handleElementDelete(stepId,elementId)}} bg="transparent" p="0" w="auto" h="auto" size="sm" mt="5px" icon={<DeleteIcon />}>Delete</IconButton>
                  </Flex>
                  <Stack spacing={10} direction="row">
                    {
                      element.data.checkboxes.map((checkbox,index)=>{
                        return(
                          <Checkbox colorScheme="green" defaultIsChecked={checkbox.isChecked}>
                            {checkbox.label}
                          </Checkbox>
                        )
                      })
                    }
                  </Stack>
                  <FormHelperText>{element.helperText}</FormHelperText>
                </FormControl>
              )
            }
            else if(element.type === "radio"){
              return(
                <FormControl as="fieldset" pb="1rem">
                  <Flex alignItems="flex-start">
                    <FormLabel color="gray.600" fontWeight="bold">{element.label}</FormLabel>
                    <IconButton onClick={()=>{handleElementDelete(stepId,elementId)}} bg="transparent" p="0" w="auto" h="auto" size="sm" mt="5px" icon={<DeleteIcon />}>Delete</IconButton>
                  </Flex>
                  <RadioGroup defaultValue={element.data.defaultValue}>
                    <HStack spacing="24px">
                      {
                        element.data.radioButtons.map((radio,index)=>{
                          return(
                            <Radio key={index} value={radio.value}>{radio.label}</Radio>
                          )
                        })
                      }
                    </HStack>
                  </RadioGroup>
                  <FormHelperText>{element.helperText}</FormHelperText>
                </FormControl>
              )
            }else if(element.type === 'textarea'){
              return (
                <FormControl id={`element-${index}`} pb="1rem">
                  <Flex alignItems="flex-start">
                    <FormLabel color="gray.600" fontWeight="bold">{element.label}</FormLabel>
                    <IconButton onClick={()=>{handleElementDelete(stepId,elementId)}} bg="transparent" p="0" w="auto" h="auto" size="sm" mt="5px" icon={<DeleteIcon />}>Delete</IconButton>
                  </Flex>
                  <Textarea
                    placeholder={element.data.placeholder}
                    size="sm"
                  />
                  <FormHelperText>{element.helperText}</FormHelperText>
                </FormControl>
              )
            }
            else{
              return (
                <FormControl id={`element-${index}`} pb="1rem">
                  <Flex alignItems="flex-start">
                    <FormLabel color="gray.600" fontWeight="bold">{element.label}</FormLabel>
                    <IconButton onClick={()=>{handleElementDelete(stepId,elementId)}} bg="transparent" p="0" w="auto" h="auto" size="sm" mt="5px" icon={<DeleteIcon />}>Delete</IconButton>
                  </Flex>
                  <Input type={element.type} placeholder={element.data.placeholder}/>
                  <FormHelperText>{element.helperText}</FormHelperText>
                </FormControl>
              )
            }
          })
        }
      </form>
    </Box>
  );
}