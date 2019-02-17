import React, { useState } from 'react';
import { Table, TableRow, TableCell, Collapse, MuiThemeProvider, withStyles, TableHead, TableBody } from '@material-ui/core';
import { appTheme } from './style';
import { blue } from '@material-ui/core/colors';

const collapseComponent = (props) => (
  <td colSpan={5}> {/* put the number of col of your table in this field */}
    <div className={props.className}>
      {props.children}
    </div>
  </td>
)

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const SubTableCell = withStyles(theme => ({
  head: {
    backgroundColor: blue[500],
    color: theme.palette.common.white
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    margin: 16,
    maxWidth: '90vw'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function App(props) {
  const [collapsedRow, setCollapsedRow] = useState(false);
  const [collapsedRowIndex, setCollapsedRowIndex] = useState(-1);
  const { classes } = props;
  return (
    <div className='App'>
      <MuiThemeProvider theme={appTheme}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Dessert (100g serving)</CustomTableCell>
              <CustomTableCell align="right">Calories</CustomTableCell>
              <CustomTableCell align="right">Fat (g)</CustomTableCell>
              <CustomTableCell align="right">Carbs (g)</CustomTableCell>
              <CustomTableCell align="right">Protein (g)</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <>
                <TableRow className={classes.row} key={row.id} hover
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setCollapsedRow(!collapsedRow)
                    setCollapsedRowIndex(index);
                  }}>
                  <CustomTableCell component="th" scope="row">
                    {row.name}
                  </CustomTableCell>
                  <CustomTableCell align="right">{row.calories}</CustomTableCell>
                  <CustomTableCell align="right">{row.fat}</CustomTableCell>
                  <CustomTableCell align="right">{row.carbs}</CustomTableCell>
                  <CustomTableCell align="right">{row.protein}</CustomTableCell>
                </TableRow>
                <Collapse
                  in={collapsedRow && index === collapsedRowIndex}
                  timeout="auto"
                  component={collapseComponent}
                  unmountOnExit
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <SubTableCell>Dessert (100g serving)</SubTableCell>
                        <SubTableCell align="right">Calories</SubTableCell>
                        <SubTableCell align="right">Fat (g)</SubTableCell>
                        <SubTableCell align="right">Carbs (g)</SubTableCell>
                        <SubTableCell align="right">Protein (g)</SubTableCell>
                        <SubTableCell align='right'>New Column</SubTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow className={classes.row} key={row.id} hover
                          style={{ cursor: 'pointer' }}
                          onClick={() => setCollapsedRow(!collapsedRow)}>
                          <SubTableCell component="th" scope="row">
                            {row.name}
                          </SubTableCell>
                          <SubTableCell align="right">{row.calories}</SubTableCell>
                          <SubTableCell align="right">{row.fat}</SubTableCell>
                          <SubTableCell align="right">{row.carbs}</SubTableCell>
                          <SubTableCell align="right">{row.protein}</SubTableCell>
                          <SubTableCell align='right'>Data</SubTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Collapse>
              </>
            ))}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    </div>
  )
}

export default withStyles(styles)(App);
