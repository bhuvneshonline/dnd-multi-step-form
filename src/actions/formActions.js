import axios from 'axios';

export const ACTIONS = {

  DELETE_ELEMENT_FROM_STEP: 'DELETE_ELEMENT_FROM_STEP',
  UPDATE_SELECTED_STEP: 'UPDATE_SELECTED_STEP',
  ADD_ELEMENT_TO_ACTIVE_STEP: 'ADD_ELEMENT_TO_ACTIVE_STEP',
  MOVE_STEP_UP: 'MOVE_STEP_UP',
  MOVE_STEP_DOWN: 'MOVE_STEP_DOWN',
  DELETE_STEP: 'DELETE_STEP',
}

export function deleteElementFromStep(stepId,elementId){
  return {
    type: ACTIONS.DELETE_ELEMENT_FROM_STEP,
    payload:{stepId,elementId},
  }
}

export function updateSelectedStep(stepId){
  return {
    type: ACTIONS.UPDATE_SELECTED_STEP,
    payload:{stepId},
  }
}

export function addElementToActiveStep(name){
  return {
    type: ACTIONS.ADD_ELEMENT_TO_ACTIVE_STEP,
    payload:{name},
  }
}

export function deleteStep(stepId){
  return {
    type: ACTIONS.DELETE_STEP,
    payload:{stepId},
  }
}

export function moveStepUp(stepId){
  return {
    type: ACTIONS.MOVE_STEP_UP,
    payload:{stepId},
  }
}

export function moveStepDown(stepId){
  return {
    type: ACTIONS.MOVE_STEP_DOWN,
    payload:{stepId},
  }
}

