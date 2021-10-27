import React, { useState, useEffect } from "react";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import axios from "axios";

import StepTwoDiv from "./style/StepTwoStyle";

function StepTwo() {
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          "https://skyit-coding-challenge.herokuapp.com/movies"
        );
        setData(data);
        console.log(data);
      } catch (err) {
        console.log("There was an error retrieving the data");
      }
    };

    getData();
  }, []);

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );

  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  return (
    <StepTwoDiv>
      <DataTable
        value={data}
        selectionMode="single"
        selection={selection}
        onSelectionChange={(e) => setSelection(e.value)}
        paginator
        // paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        // currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={10}
        rowsPerPageOptions={[5, 10, 20]}
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
      >
        <Column field="title" header="Title"></Column>
        <Column field="releaseDate" header="Year"></Column>
        <Column field="length" header="Running Time"></Column>
        <Column field="director" header="Director"></Column>
        <Column field="certification" header="Certification"></Column>
        <Column field="rating" header="Rating"></Column>
      </DataTable>
    </StepTwoDiv>
  );
}

export default StepTwo;
