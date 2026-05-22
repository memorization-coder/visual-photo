import type { Mission } from "@visual-photo/contracts";
import type { DemoMemory } from "../demoSelectors";
import { MemoryCard } from "./MemoryCard";

type MemoryWallGridProps = {
  memories: DemoMemory[];
  missions: Mission[];
  getLoveCount: (submissionId: string) => number;
  onSelectMemory: (submissionId: string) => void;
};

export function MemoryWallGrid({
  memories,
  missions,
  getLoveCount,
  onSelectMemory
}: MemoryWallGridProps) {
  return (
    <div className="columns-2 gap-md [column-fill:_balance]">
      {memories.map((memory) => (
        <div key={memory.id} className="mb-md break-inside-avoid">
          <MemoryCard
            memory={memory}
            mission={missions.find((mission) => mission.id === memory.missionId)}
            loveCount={getLoveCount(memory.id)}
            onOpen={() => onSelectMemory(memory.id)}
          />
        </div>
      ))}
    </div>
  );
}
