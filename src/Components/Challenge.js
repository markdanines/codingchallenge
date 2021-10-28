import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Dialog } from "primereact/dialog";
import axios from "axios";

import "./challengestyle.css";

function Challenge() {
  const [data, setData] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [selection, setSelection] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const dt = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          "https://skyit-coding-challenge.herokuapp.com/movies"
        );

        // Replace rating to percentage
        const newData = [];
        data.forEach((movie) => {
          // Copy movie to newMovie variable with new rating in percentage
          const newMovie = {
            ...movie,
            rating: convertRatingToPercentage(movie.rating),
          };
          newData.push(newMovie);
        });
        setData(newData);
      } catch (err) {
        console.log("There was an error retrieving the data");
      }
    };

    getData();
  }, []);

  useEffect(() => {
    setDisplayModal(true);
  }, [selection]);

  // ON CHANGE HANDLERS
  const onDirectorChange = (e) => {
    dt.current.filter(e.value, "director", "in");
    setSelectedDirector(e.value);
  };

  const onCertificationChange = (e) => {
    dt.current.filter(e.value, "certification", "equals");
    setSelectedCertification(e.value);
  };

  // TEMPLATES FOR THE MAIN BODY OF THE TABLE
  const titleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">{rowData.title}</span>
      </React.Fragment>
    );
  };

  const yearBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">{rowData.releaseDate}</span>
      </React.Fragment>
    );
  };

  const timeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">{rowData.length}</span>
      </React.Fragment>
    );
  };

  const directorBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title"></span>
        <span className="image-text">{rowData.director}</span>
      </React.Fragment>
    );
  };

  const directorItemsTemplate = (movie) => {
    return (
      <div className="p-multiselect-representative-option">
        <span className="image-text">{movie.director}</span>
      </div>
    );
  };

  // FILTERS ARRAY TO JUST ONE MOVIE FOR EACH NAME SO THAT THE MULTISELECT DOES NOT LIST MORE THAN ONE INSTANCE OF THE NAME
  const directorFilterToOne = () => {
    const newData = [];
    const names = [];

    data.forEach((movie) => {
      if (!names.includes(movie.director)) {
        names.push(movie.director);
        newData.push(movie);
      }
    });

    return newData;
  };

  const directorFilter = (
    <MultiSelect
      value={selectedDirector}
      options={directorFilterToOne()}
      itemTemplate={directorItemsTemplate}
      onChange={onDirectorChange}
      optionLabel="director"
      optionValue="director"
      placeholder="All"
      className="p-column-filter"
      style={{ width: "100%" }}
    />
  );

  const certificationBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Status</span> */}
        <span
          className={`customer-badge status-${rowData.certification
            .split(" ")
            .join("-")
            .toLowerCase()}`}
        >
          {rowData.certification}
        </span>
      </React.Fragment>
    );
  };

  const certificationItemTemplate = (option) => {
    return (
      <span>
        <div
          className={`certification-item customer-badge status-${option
            .toString()
            .split(" ")
            .join("-")
            .toLowerCase()}`}
        >
          {option}
        </div>
      </span>
    );
  };

  const certificationFilter = (
    <Dropdown
      value={selectedCertification}
      options={[...new Set(data.map((movies) => movies.certification))]}
      onChange={onCertificationChange}
      itemTemplate={certificationItemTemplate}
      placeholder="Select a Status"
      className="p-column-filter"
      showClear
    />
  );

  const ratingBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">{rowData.rating}%</span>
      </React.Fragment>
    );
  };

  const convertRatingToPercentage = (rating) => {
    return ((rating / 5) * 100).toFixed(2);
  };

  const renderModalFooter = () => {
    return (
      <p className="modal-footer">
        All movie data are from Wikipedia and IMDb.
      </p>
    );
  };

  const renderDialogBox = () => {
    return (
      <Dialog
        header="MOVIE DETAILS"
        visible={displayModal}
        modal={true}
        style={{ width: "600px", height: "800px" }}
        position={"right"}
        footer={renderModalFooter}
        onHide={() => setDisplayModal(false)}
      >
        <div className="green-box">
          <h2 className="dialog-box-title">{selection.title}</h2>
          <p className="dialog-box-director">
            Directed by {selection.director}
          </p>
          <div className="dialog-box-cast">
            <p className="dialog-cast-title">Cast: </p>
            {selection.cast.map((member) => {
              return <div className="dialog-cast-member">{member}</div>;
            })}
          </div>
          <div className="dialog-box-genre">
            <p className="dialog-cast-title">Genre: </p>
            {selection.genre.map((genre) => (
              <div className="dialog-cast-member">{genre}</div>
            ))}
          </div>
          <div className="dialog-box-plot">
            <p className="dialog-cast-title">Plot:</p>
            <p className="dialog-plot-text">{selection.plot}</p>
          </div>
        </div>
      </Dialog>
    );
  };

  return (
    <div className="mainDiv">
      <h1 className="title">Favorite Movie List</h1>
      {selection ? renderDialogBox() : null}
      <div className="table">
        <div className="card">
          <DataTable
            ref={dt}
            value={data}
            paginator
            rows={10}
            // header={header}
            className="p-datatable-customers"
            //   globalFilter={this.state.globalFilter}
            emptyMessage="No movies found"
            // selectionMode="radiobutton"
            selection={selection}
            onSelectionChange={(e) => {
              setSelection(e.value);
            }}
            // dataKey="id"
          >
            <Column
              selectionMode="single"
              headerStyle={{ width: "3em" }}
            ></Column>
            <Column
              field="title"
              header="Title"
              body={titleBodyTemplate}
              filter
              filterPlaceholder="Search by title"
            />
            <Column
              field="releaseDate"
              header="Year"
              body={yearBodyTemplate}
              filter
              filterPlaceholder="Search by year"
            />
            <Column
              field="length"
              header="Running Time"
              body={timeBodyTemplate}
              filter
              filterPlaceholder="Search by time"
            />

            <Column
              field="director"
              header="Director"
              body={directorBodyTemplate}
              filter
              filterElement={directorFilter}
            />
            <Column
              field="certification"
              header="Certification"
              body={certificationBodyTemplate}
              filter
              filterElement={certificationFilter}
            />
            <Column
              field="rating"
              header="Rating"
              body={ratingBodyTemplate}
              filter
              filterPlaceholder="Search by Rating"
              //   filterMatchMode="gte"
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default Challenge;
