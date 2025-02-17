/*
 * Copyright 2021 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StackTrace } from 'pages/inside/common/stackTrace';
import { ItemHeader } from '../itemHeader';

export const LogItem = ({ item, showErrorLogs, selectedItem, selectItem, preselected }) => {
  return (
    <>
      <ItemHeader
        item={item}
        selectItem={selectItem}
        isSelected={selectedItem === item.id}
        preselected={preselected}
      />
      {showErrorLogs && <StackTrace logItem={item} designMode="dark" transparentBackground />}
    </>
  );
};
LogItem.propTypes = {
  item: PropTypes.object.isRequired,
  showErrorLogs: PropTypes.bool,
  selectedItem: PropTypes.number,
  selectItem: PropTypes.func,
  preselected: PropTypes.bool,
};
LogItem.defaultProps = {
  showErrorLogs: false,
  selectedItem: null,
  selectItem: () => {},
  preselected: false,
};
