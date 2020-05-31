import React from "react";

const SelectedPackageContext = React.createContext({});

export const SelectedPackageProvider = SelectedPackageContext.Provider;
export const SelectedPackageConsumer = SelectedPackageContext.Consumer;

export default SelectedPackageContext;
