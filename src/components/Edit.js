import React from "react";
import { useHistory, Redirect } from "react-router";
import NoteForm from "./NoteForm";
import {
    Button,
    Grid,
    Typography,
    Box,
    CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useStyles from "../Styles";
import { updateNoteApi, getNoteApi } from "../api/NotesAPIs";

function Edit(props) {
    const [noteId, setNoteId] = React.useState();
    const [title, setTitle] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [statusCode, setStatusCode] = React.useState(0);

    const classes = useStyles();
    const history = useHistory();

    async function updateNote(e) {
        e.preventDefault();
        const note = {
            title: e.target.title.value,
            description: e.target.description.value,
        };
        await updateNoteApi(noteId, note);
        setStatusCode(202);
    }

    async function getNote(id) {
        const response = await getNoteApi(id);
        if (response.status === 404) {
            setStatusCode(404);
            return;
        }

        const note = response.data;
        setTitle(note.title);
        setDescription(note.description);
        setStatusCode(response.status);
    }

    React.useEffect(() => {
        getNote(props.match.params.id);
        setNoteId(props.match.params.id);
    }, [props.match.params.id]);

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item md={6} xs={12}>
                    <Box
                        textAlign="center"
                        className={classes.formHeading}
                        p={1}
                        mb={2}
                    >
                        <Typography variant="h4">Edit Note</Typography>
                    </Box>
                    {statusCode === 202 ? (
                        <Box textAlign="center" mb={2}>
                            <Alert severity="success">
                                Note updated successfully
                            </Alert>
                        </Box>
                    ) : (
                        ""
                    )}

                    {statusCode === 0 ? (
                        <Box textAlign="center" m={5}>
                            <CircularProgress />
                        </Box>
                    ) : statusCode === 404 ? ( // It indicating note not found
                        <Redirect to="/" />
                    ) : (
                        <NoteForm
                            saveFunction={updateNote}
                            title={title}
                            description={description}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => history.push("/")}
                                fullWidth
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Save
                            </Button>
                        </NoteForm>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default Edit;
