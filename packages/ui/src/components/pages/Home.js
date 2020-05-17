import React from 'react';
import {
  Input,
  Box,
  Button,
  Grid,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/core';

import useProcessed from '../../api/use-processed';
import addProcessed from '../../api/addProcessed';

const Home = () => {
  const [newText, setNewText] = React.useState('');
  const { data = [], mutate } = useProcessed();
  const handleAdd = async () => {
    const res = await addProcessed(newText);
    if (res) {
      setNewText('');
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
    <div className="home">
      <Input
        marginBottom={2}
        data-test-id="add-text-input"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <Button
        marginBottom={6}
        data-test-id="add-text-button"
        onClick={handleAdd}
      >
        Create Audio
      </Button>
      <Accordion allowToggle>
        {data.map(({ text, id }) => (
          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="left" isTruncated>
                {text}
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4} bg="gray.200">
              <Grid templateColumns="1fr min-content" gap={2}>
                <Box>{text}</Box>
                <Box>
                  {id && (
                    <audio
                      controls
                      src={`http://localhost:8080/processed/${id}/audio`}
                    >
                      Your browser does not support the
                      <code>audio</code> element.
                    </audio>
                  )}
                </Box>
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Home;
