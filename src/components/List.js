import React from "react";
import { useHistory } from "react-router-dom";
import {
    Box,
    CircularProgress,
    TableFooter,
    Typography,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    TextField,
    IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Pagination } from "@material-ui/lab";
import moment from "moment";

export default function List(props) {
    return (
        <>
            {props.notesList !== 0 ? (
                props.notesList.length === 0 ? (
                    <Box textAlign="center" m={5}>
                        <Typography variant="h4">No Notes Available</Typography>
                    </Box>
                ) : (
                    <NoteTable {...props} />
                )
            ) : (
                <Box textAlign="center" m={5}>
                    <CircularProgress />
                </Box>
            )}
        </>
    );
}

function NoteTable(props) {
    const [fiveNotes, setFiveNotes] = React.useState([]);
    const [currPage, setCurrPage] = React.useState(1);
    const [numberList, setNumberList] = React.useState();
    const history = useHistory();

    React.useEffect(() => {
        const start = currPage * 5 - 5;
        const end = start + 5;
        setFiveNotes(props.notesList.slice(start, end));

        const diffIndex = props.notesList.length;
        let list = [];
        for (let i = diffIndex - start; i >= diffIndex - end; i--) list.push(i);

        setNumberList(list);
    }, [props.notesList, currPage]);

    function convertDateTime(created_at) {
        return moment(new Date(created_at))
            .format("YYYY-MM-DD hh:mm A")
            .toString();
    }

    return (
        <Box mt={2}>
            <TextField
                fullWidth
                label="Search Notes"
                variant="outlined"
                onChange={(e) => props.setSearchValue(e.target.value)}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Sr no.</TableCell>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Created at</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fiveNotes.map((item, index) => (
                        <TableRow key={index} hover>
                            <TableCell align="center">
                                {numberList[index]}
                            </TableCell>
                            <TableCell
                                align="center"
                                onClick={() => history.push(`/edit/${item.id}`)}
                            >
                                {item.title}
                            </TableCell>
                            <TableCell align="center">
                                {convertDateTime(item.created_at)}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="secondary"
                                    onClick={() => props.deleteNote(item.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {5 - fiveNotes.length > 0 && (
                        <TableRow
                            style={{ height: 82 * (5 - fiveNotes.length) }}
                        >
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>
                            <Pagination
                                count={Math.ceil(props.notesList.length / 5)}
                                siblingCount={0}
                                variant="outlined"
                                color="secondary"
                                shape="rounded"
                                onChange={(_, pageNumber) =>
                                    setCurrPage(pageNumber)
                                }
                                showFirstButton
                                showLastButton
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" colSpan={4}>
                            <Typography>Click a note title to edit</Typography>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Box>
    );
}
