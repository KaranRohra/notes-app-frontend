import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useStyles from "./Styles";
import { Box, Typography } from "@material-ui/core";
import Home from "./components/Home";
import Edit from "./components/Edit";

function App() {
    const classes = useStyles();

    return (
        <>
            <Box
                textAlign="center"
                className={classes.headingColor}
                p={2}
                mb={2}
            >
                <Typography variant="h2">Notes App</Typography>
            </Box>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/edit/:id" component={Edit} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
