export default class ButtonOpenForm {
  constructor(container, formInstance) {
    this.container = container;
    this.container.addEventListener('click', () => {
      formInstance.openForm();
    });
  }
}
