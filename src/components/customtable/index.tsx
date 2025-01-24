import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Zoom,
} from "@mui/material";
import { ModelFinanceiro } from "@models/setoresInterface";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomInput from "../customInput";
import CustomSelect from "../customSelect";

type objectDataBase = {
  result: ModelFinanceiro[];
  lengthDB: number;
};

interface Props {
  childrenRowTable: React.ReactNode;
  childrenCabecarioTable: React.ReactNode;
  paginacao: React.ReactNode;
}

const Index = ({
  childrenCabecarioTable,
  childrenRowTable,
  paginacao,
}: Props) => {
  const slider: HTMLElement | null = document.querySelector(".parent");

  let mouseDown = false;
  let startX: any, scrollLeft: any;

  let startDragging = function (e: any) {
    mouseDown = true;
    startX = e.pageX - slider!.offsetLeft;
    scrollLeft = slider?.scrollLeft;
  };
  let stopDragging = function (event: any) {
    mouseDown = false;
  };

  slider?.addEventListener("mousemove", (e: any) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e?.pageX - slider!.offsetLeft;
    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;
  });

  // Add the event listeners
  slider?.addEventListener("mousedown", startDragging, false);
  slider?.addEventListener("mouseup", stopDragging, false);
  slider?.addEventListener("mouseleave", stopDragging, false);

  return (
    <div>
      <TableContainer className="parent" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
          <TableHead>{childrenCabecarioTable}</TableHead>
          <TableBody>{childrenRowTable}</TableBody>
        </Table>
      </TableContainer>
      {paginacao}
    </div>
  );
};

export default Index;
