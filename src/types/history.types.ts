import { Simulation, SimulationVersion } from './simulation.types';

export type VersionWithPatrimony = SimulationVersion & { finalPatrimony: number };
export type SimulationWithPatrimony = Simulation & { versions: VersionWithPatrimony[] };
