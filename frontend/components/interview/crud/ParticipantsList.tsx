import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import { Label } from "@radix-ui/react-label";
import { TrashIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
}

const ParticipantsFooter = ({
  addParticipantWithFetch,
}: {
  addParticipantWithFetch: any;
}) => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);

  const submitAdd = async () => {
    const email = emailInputRef.current?.value;
    if (!email?.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      emailInputRef.current.value = "";
      return;
    }
    setLoading(true);
    await addParticipantWithFetch(email);
    emailInputRef.current.value = "";
    setLoading(false);
  };

  return (
    <TableFooter className="bg-gray-100">
      <TableRow>
        <TableCell className="py-4" colSpan={3}>
          <div className="flex items-center justify-between">
            <div className="w-full max-w-xs">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter email address"
                type="email"
                ref={emailInputRef}
              />
            </div>
            <Button disabled={isLoading} className="ml-4" onClick={submitAdd}>
              {isLoading ? "Adding..." : "Add Participant"}
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

const ParticipantRow = ({
  participant,
  removeParticipant,
}: {
  participant: Participant;
  removeParticipant: any;
}) => {
  return (
    <TableRow>
      <TableCell className="flex items-center gap-3">
        <div>
          <div className="font-medium">
            {participant.firstName} {participant.lastName}
          </div>
          <div className="text-gray-500">{participant.email}</div>
        </div>
      </TableCell>
      <TableCell>
        <Badge>{participant.type}</Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button
          size="sm"
          variant="outline"
          onClick={() => removeParticipant(participant)}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

const ParticipantsList = ({
  applicationId,
  participants,
  setParticipants,
}: {
  applicationId: string | null;
  participants: Participant[];
  setParticipants: any;
}) => {
  const { session } = useAuth();

  useEffect(() => {
    if (session.isLoggedIn) {
      fetch(`http://localhost:3000/api/users/details/${session.email}`).then(
        async (res) => {
          addParticipant({ ...(await res.json()), email: session.email });
        }
      );
    }
  }, [session]);

  const addParticipantWithFetch = async (email: string) => {
    if (participants.some((p) => p.email === email)) return;

    const res = await fetch(`http://localhost:3000/api/users/details/${email}`);
    const json = await res.json();

    addParticipant({ ...json, email });
  };

  const addParticipant = (participant: Participant) => {
    if (participants.some((p) => p.id === participant.id)) return false;

    setParticipants((prevParticipants) => {
      return [...prevParticipants, participant];
    });
    return true;
  };

  const removeParticipant = (participant: Participant) => {
    setParticipants((prevParticipants) => {
      return prevParticipants.filter((p) => p.id !== participant.id);
    });
  };

  return (
    <div>
      <div className="mb-3">
        <CardTitle className="text-lg">Participants</CardTitle>
        <CardDescription>
          Who will be able to join this interview
        </CardDescription>
      </div>
      <div className="w-full shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70%]">User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => {
              return (
                <ParticipantRow
                  removeParticipant={removeParticipant}
                  participant={participant}
                  key={participant.id}
                />
              );
            })}
          </TableBody>
          <ParticipantsFooter
            addParticipantWithFetch={addParticipantWithFetch}
          />
        </Table>
      </div>
    </div>
  );
};

export default ParticipantsList;
