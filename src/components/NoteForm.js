import { Box, Grid, TextField } from "@material-ui/core";

export default function Form(props) {
    return (
        <form method="post" onSubmit={props.saveFunction}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        defaultValue={props.title ? props.title : ""}
                        name="title"
                        variant="outlined"
                        label="Title"
                        helperText="Max 50 characters"
                        fullWidth
                        autoFocus={true}
                        required
                        inputProps={{ maxLength: 50 }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        defaultValue={
                            props.description ? props.description : ""
                        }
                        name="description"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        helperText="Max 500 characters"
                        inputProps={{ maxLength: 500 }}
                        fullWidth
                        required
                    />
                </Grid>
            </Grid>
            <Grid container>
                {props.children.map((children, index) => (
                    <Grid key={index} item md={6} xs={12}>
                        <Box m={3}>{children}</Box>
                    </Grid>
                ))}
            </Grid>
        </form>
    );
}
