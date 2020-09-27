import React from 'react'

const ActiveCourseContext = React.createContext(null);

export const ActiveCourseProvider = ActiveCourseContext.Provider
export const ActiveCourseConsumer = ActiveCourseContext.Consumer

export default ActiveCourseContext;