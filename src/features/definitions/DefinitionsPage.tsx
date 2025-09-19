"use client";

import Devider from "../Devider";
import AddDefinitions from "./AddDefinition";
import DefinitionList from "./DefinitionList";

function DefinitionsPage() {
  return (
    <div className="bg-inherit">
      <AddDefinitions />
      <Devider title="لیست های من" />
      <DefinitionList />
    </div>
  );
}

export default DefinitionsPage;
