import React, { Component } from 'react';
import { Http } from 'tools/Http';

export class EditDateModal extends Component {
  static displayName = EditDateModal.name;

  constructor(props) {
    super(props);
    this.state = { month: this.props.albumData.month, year: this.props.albumData.year };
  }

  handleMonthChange = (e) => {
    this.setState({ month: e.target.value });
  };

  handleYearChange = (e) => {
    this.setState({ year: e.target.value });
  };

  saveDate = async () => {
    await Http.setAlbumDate(this.props.albumData.id, parseInt(this.state.year), parseInt(this.state.month));
    window.location.reload();
  };

  render() {
    const months = Array.from({ length: 12 }, (_, index) => 1 + index);
    const years = Array.from({ length: 17 }, (_, index) => 2014 + index);

    return (
      <>
        <div>Select Month:</div>
        <select
          style={{ width: "100px" }}
          value={this.state.month}
          onChange={this.handleMonthChange}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <br />
        <br />

        <div>Select Year:</div>
        <select
          style={{ width: "100px" }}
          value={this.state.year}
          onChange={this.handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <br />
        <br />

        <button onClick={this.saveDate}>Save</button>
      </>
    );
  }
}