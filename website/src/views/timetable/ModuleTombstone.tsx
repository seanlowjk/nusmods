import { Module } from 'types/modules';
import * as React from 'react';
import { connect } from 'react-redux';
import { undo } from 'actions/undoHistory';
import classnames from 'classnames';
import styles from './TimetableModulesTable.scss';
import { removeCustomIdentifier } from 'utils/custom';

export type Props = {
  module: Module;
  undo: () => void;
  resetTombstone: () => void;
};

const ModuleTombstone: React.FC<Props> = (props) => (
  <div className={classnames(styles.moduleInfo, styles.tombstone)}>
    <span>{removeCustomIdentifier(props.module.moduleCode)} removed</span>

    <div className={styles.moduleActionButtons}>
      <button
        type="button"
        className={classnames('btn btn-sm btn-link', styles.moduleAction)}
        onClick={props.resetTombstone}
      >
        Dismiss
      </button>
      <button
        type="button"
        className={classnames('btn btn-sm btn-link', styles.moduleAction)}
        onClick={() => {
          props.undo();
          props.resetTombstone();
        }}
      >
        Undo
      </button>
    </div>
  </div>
);

export { ModuleTombstone as DisconnectedModuleTombstone };

export default connect(null, { undo })(ModuleTombstone);
