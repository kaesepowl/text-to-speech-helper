import React from "react";
import { Input, Button } from "@chakra-ui/core";

import useProcessed from "../../api/use-processed";
import addProcessed from "../../api/addProcessed";

const Home = () => {
  const [newText, setNewText] = React.useState("");
  const { data = [], mutate } = useProcessed();
  const handleAdd = async () => {
    const res = await addProcessed(newText);
    if (res) {
      setNewText("");
      mutate(
        (data) => [
          ...data,
          {
            id: res.id,
            text: newText,
          },
        ],
        false
      );
    }
  };

  return (
    <>
      <Input
        data-test-id="add-text-input"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <Button data-test-id="add-text-button" onClick={handleAdd}>
        Create Audio
      </Button>
      <table>
        <thead>
          <tr>
            <th>Text</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ text, id }) => (
            <tr key={id}>
              <td>{text}</td>
              <td>
                {id && (
                  <audio
                    controls
                    src={`http://localhost:8080/processed/${id}/audio`}
                  >
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
