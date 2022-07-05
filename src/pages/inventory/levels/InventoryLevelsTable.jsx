/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
import React, {useEffect, useState} from 'react';
import {Row, Col} from '@/components';
import TableView from "./summaryTable/TableView";
import { getInventoriesApi } from "@/services/inventories";

const InventoryLevelsTable = ({currentDisCenter, isLoading, reloadTableData}) => {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [searchParam, setSearchParam] = useState({})
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [tableData, setTableData] = useState([]);

  const loadTable = (paginationParam_, searchParam_) => {
    setIsLoadingTable(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
      dist_center_id: searchParam_.dist_center_id,
    };
    getInventoriesApi(params, onGetInventoryLevel, onFailInventoryLevel);
  };

  const onGetInventoryLevel = (data) => {
    console.log('dataaaaa', data)
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoadingTable(false);
  };

  const onFailInventoryLevel = () => {
    setIsLoadingTable(false);
  };

  useEffect(() => {
    if (currentDisCenter && currentDisCenter.value) {
      const searchParam_ = {
        dist_center_id: currentDisCenter.value
      }
      setSearchParam(searchParam_)
      const paginationParam_ = { ...paginationParam, currentPage: 1 };
      loadTable(paginationParam_, searchParam_);
    }
  }, [currentDisCenter, reloadTableData]);

  return (
    <>
      <Row gutter={[15,15]} className="search-result-container inventory-level-table">
        <Col xs={24}>
          <TableView
            tableData={tableData}
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            isLoading={isLoading || isLoadingTable}
            loadTable={loadTable}
            searchParam={searchParam}
          />
        </Col>
      </Row>
    </>
  );
};

export default InventoryLevelsTable;
