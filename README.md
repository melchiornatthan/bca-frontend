# BCAPP Front END

## Description

Introducing Memo Automation web application designed to streamline requests for installation, relocation, and dismantling entities that uses VSAT. Whether it's for installation, relocation, or dismantling, this platform automates the entire process. From initiating requests to vendor selection and report generation.


## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/melchiornatthan/bca-frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd bca-frontend
   ```

3. Install the project dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```

2. The development server will run at `http://localhost:3000` by default. You can access the project in your web browser.

## Project Structure

The project structure is organized as follows:

- `src/`: This directory contains all the source code for the React application.
  - `components/`: This directory contains reusable React components.
  - `App.js`: The main entry point for the application.
  - `assets/`: This directory contains images that are used in this project
  - `pages/` : This directory will have user and admin subdirectory that will contain the pages for both user and admin
  - `service/` : This directory will contain the communication with the backend server for data fetching, posting a request, etc. 

## Configuration

If your project requires any configuration, such as API endpoints, environment variables, or other settings, make sure to document them here.

## Contributing

If you want to contribute to this project, follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Create a pull request on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
