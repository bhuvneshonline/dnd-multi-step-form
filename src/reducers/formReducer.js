import {omit,mapKeys,cloneDeep,isEmpty} from 'lodash';
import move from 'lodash-move';

import { ACTIONS } from '../actions/formActions';

const DefaultElementValues = {
  text: {
    type: 'text',
    label: 'Sample',
    helperText: 'sample helper text',
    data: {
      placeholder: 'placeholder value',
      defaultValue: 'Sample Text',
      required: false,
    }
  },
  email: {
    type: 'email',
    label: 'Email',
    helperText: 'sample helper text',
    data: {
      placeholder: 'placeholder value',
      defaultValue: 'Sample Text',
      required: false,
    }
  },
  textarea: {
    type: 'textarea',
    label: 'Textarea',
    helperText: 'sample helper text',
    data: {
      placeholder: 'placeholder value',
      defaultValue: 'Sample Text',
      required: false,
    }
  },
  checkboxes: {
    type: 'checkboxes',
    label: 'CheckBox Sample',
    helperText: 'sample helper text',
    data: {
      placeholder: 'placeholder value',
      required: false,
      checkboxes: [
        {
          value: 'value 1',
          label: 'label 1',
          isChecked: true,
        },
        {
          value: 'value 2',
          label: 'label 1',
          isChecked: false,
        }
      ]
    }
  },
  radio: {
    type: 'radio',
    label: 'Radio Sample',
    helperText: 'sample helper text',
    data: {
      placeholder: 'placeholder value',
      defaultValue: 'value 1',
      required: false,
      radioButtons: [
        {
          value: 'value 1',
          label: 'label 1',
          isChecked: true,
        },
        {
          value: 'value 2',
          label: 'label 1',
          isChecked: false,
        }
      ]
    }
  }
};

const DefaultNewForm = {
  name: 'new Form',
  selectedStep: 0,
  stepsOrder: [0,1,2,3],
  steps: {
    0: {
      title: 'Step 1',
      elements_order: [0,1,2,3,4],
    },
    1: {
      title: 'Step 1',
      elements_order: [],
    },
    2: {
      title: 'Step 3',
      elements_order: [],
    },
    3: {
      title: 'Step 4',
      elements_order: [],
    }
  },
  elements: {
    0: DefaultElementValues['text'],
    1: DefaultElementValues['email'],
    2: DefaultElementValues['textarea'],
    3: DefaultElementValues['checkboxes'],
    4: DefaultElementValues['radio'],
  }
};


const initState = {

  allForms: [],
  currentForm: DefaultNewForm,
  isLoadingForms:false,
  isLoadingFormsError: false,

}

export default function(state = initState, action){
  let newState = cloneDeep(state);

  switch (action.type) {
    
    //delete an element from form step
    case ACTIONS.DELETE_ELEMENT_FROM_STEP:{
      const {currentForm} = state;
      const {stepId,elementId} = action.payload;
      const currentStep = currentForm.steps[stepId];
      const newStepElementOrder = currentStep.elements_order.filter(value => value !== elementId);
      console.log(newStepElementOrder);
      newState = {
        ...state,
        currentForm: {
          ...currentForm,
          steps: {
            ...currentForm.steps,
            [stepId]: {
              ...currentStep,
              elements_order: newStepElementOrder
            }
          }
        },
      };
      
      return newState;
    }

    //delete step
    case ACTIONS.DELETE_STEP:{
      const {currentForm} = state;
      const {stepId} = action.payload;
      const currentStep = currentForm.steps[stepId];
      const newStepsOrder = currentForm.stepsOrder.filter(value => value !== stepId);
      console.log(newStepsOrder);
      newState = {
        ...state,
        currentForm: {
          ...currentForm,
          stepsOrder: newStepsOrder,
        },
      };
      
      return newState;
    }

    //update selected Step
    case ACTIONS.UPDATE_SELECTED_STEP:{
      const {currentForm} = state;
      const {stepId} = action.payload;
      newState = {
        ...state,
        currentForm: {
          ...currentForm,
          selectedStep: stepId,
        },
      };
      
      return newState;
    }

    //add element to active Step
    case ACTIONS.ADD_ELEMENT_TO_ACTIVE_STEP:{
      const {name} = action.payload
      const {currentForm} = state;
      const {selectedStep} = currentForm;
      const newLayerId = (Object.keys(currentForm.elements)[Object.keys(currentForm.elements).length-1])+1;


      // const newElementsObj = {

      // }

      newState = {
        ...state,
        currentForm: {
          ...currentForm,
          ...currentForm,
          steps: {
            ...currentForm.steps,
            [selectedStep]: {
              ...currentForm.steps[selectedStep],
              elements_order: currentForm.steps[selectedStep].elements_order.concat(newLayerId),
            }
          },
          elements:{
            ...currentForm.elements,
            [newLayerId]: DefaultElementValues[name],
          }
        },
      };

      console.log(newState,newLayerId)
      
      return newState;
    }

    //move Form Step Up
    case ACTIONS.MOVE_STEP_UP:{
      const {stepId} = action.payload
      const {currentForm} = state;
      const {stepsOrder} = currentForm;
      const currentStepIndex = stepsOrder.indexOf(parseInt(stepId));
      console.log(stepsOrder,stepId,currentStepIndex);

      const newStepsOrderArray = move(stepsOrder,currentStepIndex,currentStepIndex - 1);
      console.log(newStepsOrderArray)


      newState = {
        ...state,
        currentForm: {
          ...currentForm,
          stepsOrder: newStepsOrderArray, 
        },
      };
      return newState;
    }

    //move Form Step Down
    case ACTIONS.MOVE_STEP_DOWN:{
      const {stepId} = action.payload
      const {currentForm} = state;
      const {stepsOrder} = currentForm;
      const currentStepIndex = stepsOrder.indexOf(parseInt(stepId));
      console.log(stepsOrder,stepId,currentStepIndex);
      const newStepsOrderArray = move(stepsOrder,currentStepIndex,currentStepIndex + 1);
      console.log(newStepsOrderArray)

      newState = {
        ...state,
        currentForm: {
          ...currentForm,
          stepsOrder: newStepsOrderArray, 
        },
      };
      return newState;
    }

    default:
      return state;
  }
}
