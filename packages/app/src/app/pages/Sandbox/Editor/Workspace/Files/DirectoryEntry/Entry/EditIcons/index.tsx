declare global {
    interface Window {
        __isTouch: boolean;
    }
}
import * as React from 'react';

import CrossIcon from 'react-icons/lib/md/clear';
import EditIcon from 'react-icons/lib/go/pencil';
import AddFileIcon from 'react-icons/lib/md/insert-drive-file';
import AddDirectoryIcon from 'react-icons/lib/md/create-new-folder';

import Tooltip from 'common/components/Tooltip';

import { Icon } from '../../../../elements';
import { Container } from './elements';

const handleClick = (func) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    func();
};

type Props = {
    className?: string;
    hovering: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
    onCreateFile?: () => void;
    onCreateDirectory?: () => void;
    active?: boolean;
};

const EditIcons: React.SFC<Props> = ({
    className,
    hovering,
    onDelete,
    onEdit,
    onCreateFile,
    onCreateDirectory,
    active
}) => {
    // Phones need double click if we show elements on click, that's why we only want
    // to show these edit icons when the user clicks and hasn't activated the module
    if (window.__isTouch && !active) {
        return null;
    }

    return (
        <div className={className}>
            {(hovering || (window.__isTouch && active)) && (
                <Container>
                    {onEdit && (
                        <Tooltip title="Edit">
                            <Icon onClick={handleClick(onEdit)}>
                                <EditIcon />
                            </Icon>
                        </Tooltip>
                    )}
                    {onCreateFile && (
                        <Tooltip title="New File">
                            <Icon onClick={handleClick(onCreateFile)}>
                                <AddFileIcon />
                            </Icon>
                        </Tooltip>
                    )}
                    {onCreateDirectory && (
                        <Tooltip title="New Directory">
                            <Icon onClick={handleClick(onCreateDirectory)}>
                                <AddDirectoryIcon />
                            </Icon>
                        </Tooltip>
                    )}
                    {onDelete && (
                        <Tooltip title="Delete">
                            <Icon onClick={handleClick(onDelete)}>
                                <CrossIcon />
                            </Icon>
                        </Tooltip>
                    )}
                </Container>
            )}
        </div>
    );
};

export default EditIcons;