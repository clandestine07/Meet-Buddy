import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const fetchAllCalls = () => {
    const [calls, setCalls] =  useState<Call[]>([]);
    const [loading, setIsLoading] = useState(false);
    const client = useStreamVideoClient();
    const { user } = useUser();

    useEffect(() => {
        const getCalls = async () => {
            if (!client || !user?.id) return;
            setIsLoading(true);
            try {
                const { calls } = await client.queryCalls({
                    sort: [{ field: 'starts_at', direction: -1 }],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id },
                            { members: { $in: [user.id] } },
                        ],
                    },
                });
                setCalls(calls);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getCalls();
    }, [client, user?.id]);

    const now = new Date();
    const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
        return startsAt && new Date(startsAt) > now;
    });
    const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
        return (startsAt && new Date(startsAt) < now) || !!endedAt;
    });

    return {
        upcomingCalls,
        endedCalls,
        callRecordings: calls,
        loading,
    };
};