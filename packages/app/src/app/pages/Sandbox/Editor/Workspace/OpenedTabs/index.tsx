import * as React from 'react';
import { connect, WithCerebral } from 'app/fluent';

import EntryIcons from 'app/pages/Sandbox/Editor/Workspace/Files/DirectoryEntry/Entry/EntryIcons';
import getType from 'app/utils/get-type';
import { getModulePath } from 'common/sandbox/modules';

import CrossIcon from 'react-icons/lib/md/clear';

import WorkspaceItem from '../WorkspaceItem';
import { EntryContainer } from '../elements';
import { Title, Dir, CrossIconContainer } from './elements';
import SaveIcon from './SaveIcon';

type Props = WithCerebral;

const OpenedTabs: React.SFC<Props> = ({ store, signals }) => {
    const sandbox = store.editor.currentSandbox;
    const currentModuleShortid = store.editor.currentModuleShortid;
    const moduleObject = {};
    sandbox.modules.forEach((m) => {
        moduleObject[m.shortid] = m;
    });

    const openModules = store.editor.tabs.map((t) => moduleObject[t.moduleShortid]).filter((x) => x);

    return (
        <WorkspaceItem
            title="Open Tabs"
            actions={
                <SaveIcon
                    disabled={store.editor.isAllModulesSynced}
                    onClick={(e) => {
                        if (e) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        signals.editor.saveClicked();
                    }}
                />
            }
        >
            {openModules.map((m, i) => (
                <EntryContainer
                    onClick={() => {
                        signals.editor.moduleSelected({ id: m.id });
                    }}
                    active={currentModuleShortid === m.shortid}
                    key={m.id}
                >
                    <EntryIcons type={getType(m.title)} error={m.errors && m.errors.length > 0} />
                    <Title>{m.title}</Title>
                    <Dir>
                        {getModulePath(sandbox.modules, sandbox.directories, m.id)
                            .replace('/', '')
                            .replace(new RegExp(m.title + '$'), '')}
                    </Dir>
                    {currentModuleShortid !== m.shortid && (
                        <CrossIconContainer
                            onClick={(e) => {
                                if (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }

                                signals.editor.tabClosed({ tabIndex: i });
                            }}
                        >
                            <CrossIcon />
                        </CrossIconContainer>
                    )}
                </EntryContainer>
            ))}
        </WorkspaceItem>
    );
};

export default connect<Props>()(OpenedTabs);
