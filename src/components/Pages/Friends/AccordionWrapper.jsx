import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const AccordionWrapper = ({ title, list }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>{title}</AccordionSummary>
      <AccordionDetails>{list}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionWrapper;
