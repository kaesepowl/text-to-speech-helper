import React from "react";
import { Link } from "@chakra-ui/core";

import useProcessed from "../../api/use-processed";

const Home = () => {
  const { data = [] } = useProcessed();
  return (
    <table>
      <thead>
        <tr>
          <th>Text</th>
          <th>Preview</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ text, id }) => (
          <tr key={id}>
            <td>{text}</td>
            <td>
              <audio
                controls
                src={`http://localhost:8080/processed/${id}/audio`}
              >
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </td>
            <td>
              <Link href={`/audio/${id}.mp3`}>Download</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Home;
