import {createAction} from '@reduxjs/toolkit';

export const apiCallBegan = createAction('api/callBegan');
export const apiCallSucces = createAction('api/callsuccess');
export const apiCallFail = createAction('api/callFail');