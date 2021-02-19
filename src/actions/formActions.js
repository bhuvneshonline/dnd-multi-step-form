import axios from 'axios';
// import deserializer from '../serializer/deserializer/index';

// import {storeService} from '../services/storeService';

export const ACTIONS = {

  DELETE_ELEMENT_FROM_STEP: 'DELETE_ELEMENT_FROM_STEP',
  UPDATE_SELECTED_STEP: 'UPDATE_SELECTED_STEP',
  ADD_ELEMENT_TO_ACTIVE_STEP: 'ADD_ELEMENT_TO_ACTIVE_STEP',
  MOVE_STEP_UP: 'MOVE_STEP_UP',
  MOVE_STEP_DOWN: 'MOVE_STEP_DOWN',
  DELETE_STEP: 'DELETE_STEP',
}

// export function findPublicBanner(params){
//   return dispatch => {
//     dispatch(started());
    
//     // const request = storeService.custom('/pbanners','POST',params,false)
//     // .then((response)=>{
//     //   const originalData = response.data;
//     //   console.log(response);
//     //   deserializer.deserialize(response.data)
//     //   .then(data =>{
//     //     const templateData = {
//     //       ...data,
//     //       design_data: originalData.data.attributes.design_data == null ? null : {
//     //         ...originalData.data.attributes.design_data
//     //       },

//     //     };
//     //     console.log('loaded Template image');
//     //     console.log(templateData);
//     //     // console.log('originalData',);
//     //     // console.log(data);
//     //     dispatch(success(templateData));
//     //     // callback(data);
//     //   })
//     // },error => {
//     //   dispatch(failure(error.response));
//     //   console.log(error.response);
//     // })

//     // function started(){ return {type: ACTIONS.LOAD_PUBLIC_BANNER_STARTED} }  
//     // function success(templates){ return {type: ACTIONS.LOAD_PUBLIC_BANNER_SUCCESS, templates} }  
//     // function failure(error){ return {type: ACTIONS.LOAD_PUBLIC_BANNER_FAILURE, error} }
//   }
// }

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

