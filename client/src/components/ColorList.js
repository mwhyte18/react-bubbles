import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res);
        resetbubbles();
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log("deleted", res.data);
        resetbubbles();
      })
      .catch(err => console.log(err));
  };
  const resetbubbles = () => {
    axiosWithAuth()
      .get("/api/colors")
      .then(res => {
        console.log("updated", res);
        updateColors(res.data);
        setEditing(false);
        setAddColor(res.data);
      })
      .catch(err => console.log(err));
  };
  const addForm = e => {
    axiosWithAuth()
      .post(`/api/colors`, addColor)
      .then(res => {
        console.log("Add New Color", res.data);
        resetbubbles();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={addForm}>
        <legend>Add a new Bubble</legend>
        <label>
          color name:
          <input
            type="text"
            name="color"
            onChange={e => setAddColor({ ...addColor, color: e.target.value })}
            value={addColor.color}
          />
        </label>
        <label>
          hex code:
          <input
            type="text"
            name="hex"
            onChange={e =>
              setAddColor({
                ...addColor,
                code: { hex: e.target.value }
              })
            }
          />
        </label>
        <div className="button-row">
          <button type="submit">Add</button>
        </div>
      </form>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
