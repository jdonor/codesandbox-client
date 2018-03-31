import * as React from 'react';
import EntryIcons from 'app/pages/Sandbox/Editor/Workspace/Files/DirectoryEntry/Entry/EntryIcons';
import getType from 'app/utils/get-type';
import { Module } from 'app/store/modules/editor/types';

import { StyledCloseIcon, StyledNotSyncedIcon, Container, TabTitle, TabDir } from './elements';

type Props = {
    active: boolean;
    dirty: boolean;
    isOver: boolean;
    position: number;
    onClick: () => void;
    onDoubleClick: () => void;
    module: Module;
    dirName: string;
    tabCount: number;
    hasError: boolean;
    isNotSynced: boolean;
    closeTab: (position: number) => void;
};

type State = {
    hovering: boolean;
};

class Tab extends React.Component<Props, State> {
    state = { hovering: false };

    handleMouseEnter = () => {
        this.setState({
            hovering: true
        });
    };

    handleMouseLeave = () => {
        this.setState({
            hovering: false
        });
    };

    onMouseDown = (e) => {
        if (e.button === 1) {
            // Middle mouse button
            this.closeTab(e);
        }
    };

    closeTab = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.closeTab) {
            this.props.closeTab(this.props.position);
        }
    };

    render() {
        const {
            active,
            dirty,
            isOver,
            onClick,
            onDoubleClick,
            module,
            dirName,
            tabCount,
            hasError,
            isNotSynced
        } = this.props;

        const { hovering } = this.state;

        return (
            <Container
                active={active}
                dirty={dirty}
                isOver={isOver}
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onMouseDown={this.onMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <EntryIcons type={getType(module.title)} error={hasError} />
                <TabTitle>{module.title}</TabTitle>
                {dirName && <TabDir>../{dirName}</TabDir>}
                {this.props.closeTab && isNotSynced ? (
                    <StyledNotSyncedIcon onClick={tabCount > 1 ? this.closeTab : null} show />
                ) : (
                    <StyledCloseIcon onClick={this.closeTab} show={tabCount > 1 && (active || hovering)} />
                )}
            </Container>
        );
    }
}

export default Tab;
