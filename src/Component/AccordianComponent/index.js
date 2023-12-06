import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const AccordianComponent = (props) => {
    const { id, title, desc } = props;
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div>
            <Accordion className="mb-2" expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${id}bh-content`}
                    id={`panel${id}bh-header`}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {id}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {desc.replace( /(<([^>]+)>)/ig, '')}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
export default AccordianComponent;