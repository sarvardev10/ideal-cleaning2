import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { service } from "@service";
import { Service } from "@modal";
import { useState, useEffect } from "react";
import editImg from "../../../assets/edit.svg";
import deleteImg from "../../../assets/delete.svg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35, 137, 218, 1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ data }) {
  const [tableData, setTableData] = useState([]);
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const deleteItem = async (id) => {
    try {
      const response = await service.delete(id);
      if (response.status === 200) {
        setTableData((prevData) => prevData.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };

  return (
    <>
      <Service item={edit} open={open} handleClose={() => setOpen(false)} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T / R</StyledTableCell>
              <StyledTableCell align="center">Service Name</StyledTableCell>
              <StyledTableCell align="center">Service Price</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">{item.name}</StyledTableCell>
                <StyledTableCell align="center">{item.price}</StyledTableCell>
                <StyledTableCell align="center" className="flex space-x-4">
                  <div className="flex items-center space-x-4 justify-center">
                    <img
                      onClick={() => editItem(item)}
                      src={editImg}
                      alt="edit"
                      className="cursor-pointer hover:scale-125 transition-all duration-200"
                    />
                    <img
                      onClick={() => deleteItem(item.id)}
                      src={deleteImg}
                      alt="delete"
                      className="cursor-pointer hover:scale-125 transition-all duration-200"
                    />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
