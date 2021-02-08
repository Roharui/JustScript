import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';

import DataSender from 'src/lib/DataSender';
import { getInstance } from 'src/lib/TemaManager';


interface Column {
  id: 'id' | 'descript' | 'nickname' | 'priority';
  label: string;
  maxWidth?:number;
  minWidth?: number;
  align?: 'right' | "center" | "left";
}

const columns: Column[] = [
  { id: 'id', label: 'id', maxWidth: 50, align:"center" },
  {
    id: 'descript',
    label: '설명',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'nickname',
    label: '제작자',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'priority',
    label: '우선도',
    maxWidth: 5,
    align: 'center',
  },
];

interface Data {
    id: number,
    descript: string,
    nickname: string,
    priority: string
}

const ds = new DataSender()

export default function Tema() {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState<Data[]>([])
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [render, reRender] = React.useState(0)
  const tm = getInstance()
  
  React.useEffect(() => {
    ds.temaLst()
    .then(x => {
      setRows(x)
    })
  }, [render])

  const deleteTema = (event: unknown, id:any) => {
    tm.pop(id)
    reRender(render + 1)
  }

  const updatePrio = (event: unknown, id:any, flag:any) => {
    tm.changePrio(id, flag)
    reRender(render + 1)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper style={{
      height: "100%",
      padding: "30px",
      overflow: "auto",
  }}>
      <TableContainer style={{width:"auto"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ maxWidth: column.maxWidth,minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
                <TableCell
                  align="center"
                >
                  우선도 조작
                </TableCell>
                <TableCell
                  align="center"
                >
                  삭제
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <p onClick={(e) => updatePrio(e, row.id, -1)}><ArrowDropUpIcon/></p>
                    <p onClick={(e) => updatePrio(e, row.id, 1)}><ArrowDropDownIcon/></p>
                  </TableCell>
                  <TableCell align="center">
                    <p onClick={(e) => deleteTema(e, row.id)}><DeleteIcon/></p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}