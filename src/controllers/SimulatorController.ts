import { Request, Response } from "express";
import { Simulator } from "../models/Simulator";
import Log from "../resources/log/Log";
import { DEFAULT_PAYLOAD_LIMIT } from "../config";

class SimulatorController {
  public async getSimulators (req: Request, res: Response) {
    const simulators = await Simulator.find().limit(DEFAULT_PAYLOAD_LIMIT).lean();
    Log.info({ simulators, description: "getSimulators response" });
    res.json({ simulators });
  }

  public async getSimulatorsByProfileId (req: Request, res: Response) {
    let query = {};
    const { profileId } = req.params;
    Log.info({ profileId, description: "getSimulatorsByProfileId Params" });
    query = { profileId };
    const data = await Simulator.find(query).lean();
    res.json(data);
  }

  public async saveProfileIdSimulator (req: Request, res: Response) {
    const { profileId } = req.params;
    const {
      dateRecorded,
      cryptocurrency,
      euros,
      price,
      quantity
    } = req.body;

    const newData = {
      dateRecorded,
      cryptocurrency,
      euros,
      price,
      quantity,
      profileId
    };
    Log.info({ newData, description: "saveProfileIdSimulator Params" });
    const simulator = await Simulator.create(newData);
    res.json(simulator);
  }
}

export default new SimulatorController();
