import React from 'react';

export const navigationRef: any = React.createRef();

/**
 *
 * @param name Method to navigate on some other screen
 * @param params
 */
export function navigate(name: any, params: any) {
  navigationRef.current?.navigate(name, params);
}

/**
 *
 * @returns Method to goBack on the Previous screen
 */

export function goBack() {
  navigationRef.current?.goBack();
}
