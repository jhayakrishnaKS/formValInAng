import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormVal } from 'src/app/models/form-val';

@Component({
  selector: 'app-form-val',
  templateUrl: './form-val.component.html',
  // styleUrls: ['./form-val.component.css']
})
export class FormValComponent {
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  FormComponent: FormVal[] = [];
  editId = 0;
  btnText = 'Add';
  // Add : string = "";

  onSubmit(form: NgForm) {}
  // add function
  add(): void {
    if (this.editId === 0) {
      // Check if it's an "add" operation (editId is 0)
      let form: FormVal = {
        // Create a new form object with the input values
        id: this.FormComponent.length + 1, // Set a unique id for the new form
        name: this.name, // Get the name from the input
        email: this.email, // Get the email from the input
        phoneNumber: this.phoneNumber, // Get the phone number from the input
      };
      this.FormComponent.push(form); // Add the new form to the FormComponent array
      this.name = '';
      this.email = '';
      this.phoneNumber = '';
      this.btnText = 'Add';
    } else {
      // If editId is not 0, it's an "edit" operation
      const editedFormIndex = this.FormComponent.findIndex(
        // Find the index of the form with the specified editId in the FormComponent array
        (form) => form.id === this.editId
      );

      if (editedFormIndex !== -1) {
        // Check if the form with the specified editId is found
        this.FormComponent[editedFormIndex] = {
          // Update the existing form with the new values
          id: this.editId, // Keep the same id
          name: this.name, // Update the name
          email: this.email, // Update the email
          phoneNumber: this.phoneNumber, // Update the phone number
        };
        this.editId = 0; //Reset the editId to 0 after editing
      }
    }
  }
  // delete function
  delete(id: number): void {
    this.FormComponent = this.FormComponent.filter((form) => form.id !== id);
  }
  // edit function
  edit(id: number): void {
    this.editId = id; // Set the editId to the specified id

    const formToEdit = this.FormComponent.find((form) => form.id === id); // Find the form to edit in the FormComponent array based on the specified id
    if (formToEdit) {
      // If the form is found, update the input fields with its values
      this.name = formToEdit.name;
      this.email = formToEdit.email;
      this.phoneNumber = formToEdit.phoneNumber;
    }
    this.btnText = 'update';
  }
}
