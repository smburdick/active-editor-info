'use babel';

import ActiveEditorInfoView from './active-editor-info-view';
import { CompositeDisposable } from 'atom';

export default {

  activeEditorInfoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable(
      // add an opener for our view
      atom.workspace.addOpener(uri => {
        if (uri === 'atom://active-editor-info') {
          return new ActiveEditorInfoView();
        }
      }),

      // register command that toggles this view
      atom.commands.add('atom-workspace', {
        'active-editor-info:toggle': () => this.toggle()
      }),

      // Destroy any ActiveEditorInfoViews when the package is deactivated
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof ActiveEditorInfoView) {
            item.destroy();
          }
        });
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    atom.workspace.toggle('atom://active-editor-info');
  }

};
