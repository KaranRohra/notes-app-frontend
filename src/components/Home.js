import React from "react";
import { Typography, Box, Grid, Button } from "@material-ui/core";
import useStyles from "../Styles";

import List from "./List";
import Form from "./NoteForm";

import { getNotesApi, saveNoteApi, deleteNoteApi } from "../api/NotesAPIs";

const Home = () => {
    const classes = useStyles();
    const [notesList, setNotesList] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState("");

    async function saveNote(e) {
        e.preventDefault();
        let note = {
            title: e.target.title.value,
            description: e.target.description.value,
        };
        note = await saveNoteApi(note);

        setNotesList([note].concat(notesList));
    }

    const deleteNote = async (id) => {
        await deleteNoteApi(id);
        setNotesList(notesList.filter((item) => item.id !== id));
    };

    React.useEffect(() => {
        const getNotes = async () =>
            setNotesList(await getNotesApi(searchValue));
        getNotes();
    }, [searchValue]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    <Box
                        textAlign="center"
                        className={classes.formHeading}
                        p={1}
                        mb={2}
                    >
                        <Typography variant="h4">Create note</Typography>
                    </Box>

                    <Form saveFunction={saveNote}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="reset"
                            fullWidth
                        >
                            Clear
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Add Note
                        </Button>
                    </Form>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box
                        textAlign="center"
                        className={classes.noteListHeading}
                        p={1}
                        mb={2}
                    >
                        <Typography variant="h4">Notes list</Typography>
                    </Box>

                    <List
                        notesList={notesList}
                        deleteNote={deleteNote}
                        setSearchValue={setSearchValue}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
