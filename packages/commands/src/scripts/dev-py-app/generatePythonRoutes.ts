import {
  dirStructureToIR,
  IRToUnixFilePath,
  readDirStructure,
} from "@atrilabs/atri-app-core";
import { PAGE_DIR, ROUTES_DIR } from "../../consts";
import path from "path";
import fs from "fs";

export function generatePythonRoute(unixFilepath: string) {
  return `from .${path.basename(unixFilepath)}_model import Page
from fastapi import Request, Response

def init_state(at: Page):
	"""
	This function is called everytime "Publish" button is hit in the editor.
	The argument "at" is a dictionary that has initial values set from visual editor.
	Changing values in this dictionary will modify the intial state of the app.
	"""
	pass

def handle_page_request(at: Page, req: Request, res: Response, query: str):
	"""
	This function is called whenever a user loads this route in the browser.
	"""
	pass

def handle_event(at: Page, req: Request, res: Response):
	"""
	This function is called whenever an event is received. An event occurs when user
	performs some action such as click button.
	"""
	pass`;
}

export async function generatePythonRoutes() {
  const filePaths = await readDirStructure(PAGE_DIR);
  const irs = dirStructureToIR(filePaths);
  irs
    .filter((ir) => {
      const unixFilepath = IRToUnixFilePath(ir).replace(/^\//, "");
      const routeControllerPath = path.resolve(
        ROUTES_DIR,
        unixFilepath + ".py"
      );
      // do nothing if the route file is already generated previously
      if (fs.existsSync(routeControllerPath)) {
        return false;
      }
      return true;
    })
    .forEach((ir) => {
      const unixFilepath = IRToUnixFilePath(ir).replace(/^\//, "");
      const routeControllerPath = path.resolve(
        ROUTES_DIR,
        unixFilepath + ".py"
      );
      const routeControllerDir = path.dirname(routeControllerPath);
      if (!fs.existsSync(routeControllerDir)) {
        fs.mkdirSync(routeControllerDir, { recursive: true });
      }
      const content = generatePythonRoute(unixFilepath);
      fs.writeFileSync(routeControllerPath, content);
    });
}
