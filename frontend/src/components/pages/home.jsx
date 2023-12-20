import { useState, useEffect } from 'react';
import { Container, Paper, Tab, Tabs, Typography, Grid, Card, CardContent, Link, Box, Tooltip } from '@mui/material';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import fileStructureData from '../configs/fileStructure.json'; // Importing the JSON data for the file structure

// Define the getColor function at the top-level
const getColor = (language) => {
    switch (language) {
        case 'JavaScript': return 'gold';
        case 'Python': return 'deepskyblue';
        case 'HTML': return 'orangered';
        case 'CSS': return 'blueviolet';
        default: return 'grey';
    }
};

function LanguageBar({ languages }) {
    const total = Object.values(languages).reduce((sum, value) => sum + value, 0);

    

    return (
        <Box display="flex" width="100%" height={10} borderRadius={4} overflow="hidden">
            {Object.entries(languages).map(([lang, percent]) => (
                <Tooltip title={lang} key={lang}>
                    <Box width={`${(percent / total) * 100}%`} bgcolor={getColor(lang)} />
                </Tooltip>
            ))}
        </Box>
    );
}

function renderTree(nodes) {
    return (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );
}

function HomePage() {
    const [tabValue, setTabValue] = useState(0);
    const [readmeContent, setReadmeContent] = useState('');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const summaryDetails = {
        mainSummary: 'This project is a comprehensive solution...',
        languages: {
            JavaScript: 60,
            Python: 25,
            HTML: 10,
            CSS: 5
        },
        languageLinks: {
            JavaScript: 'https://www.javascript.com/',
            Python: 'https://www.python.org/',
            HTML: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
            CSS: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
        },
        githubLink: 'https://github.com/your-repository',
        fileStructure: 'src/, components/, utils/, tests/'
    };

    useEffect(() => {
        setReadmeContent('README content goes here...');
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                Repository Name
            </Typography>

            <Paper square>
                <Tabs
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleTabChange}
                >
                    <Tab label="Summary" />
                    <Tab label="Readme" />
                    <Tab label="Additional Resources" />
                </Tabs>
            </Paper>
            {tabValue === 0 && (
                <Grid container spacing={2} style={{ marginTop: 20 }}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Project Summary</Typography>
                                <Typography>{summaryDetails.mainSummary}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Languages Used</Typography>
                                <Box display="flex" flexDirection="column" marginBottom={2}>
                                    {Object.entries(summaryDetails.languageLinks).map(([lang, url]) => (
                                        <Link key={lang} href={url} target="_blank" rel="noopener noreferrer" style={{ color: getColor(lang), marginBottom: 8 }}>
                                            {lang}
                                        </Link>
                                    ))}
                                </Box>
                                <Typography variant="h6">Language Bar</Typography>
                                <LanguageBar languages={summaryDetails.languages} />
                            </CardContent>
                        </Card>
                        <Card style={{ marginTop: '20px' }}>
                            <CardContent>
                                <Typography variant="h6">GitHub Link</Typography>
                                <Link href={summaryDetails.githubLink} target="_blank" rel="noopener noreferrer">
                                    {summaryDetails.githubLink}
                                </Link>
                            </CardContent>
                        </Card>
                        <Card style={{ marginTop: '20px' }}>
                            <CardContent>
                                <Typography variant="h6">File Structure</Typography>
                                <TreeView
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                >
                                    {renderTree(fileStructureData)}
                                </TreeView>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
            {/* Additional tabs content */}
        </Container>
    );
}

export default HomePage;
