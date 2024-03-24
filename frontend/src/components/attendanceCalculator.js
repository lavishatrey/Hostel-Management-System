export const calculateHostelAttendancePercentage = (presentCount, totalSessions) => {
    if (totalSessions === 0 || presentCount === 0) {
        return 0;
    }
    const percentage = (presentCount / totalSessions) * 100;
    return percentage.toFixed(2); // Limit to two decimal places
};


export const groupAttendanceByHostel = (hostelAttendance) => {
    const attendanceByHostel = {};

    hostelAttendance.forEach((attendance) => {
        const subName = attendance.subName.subName;
        const sessions = attendance.subName.sessions;
        const subId = attendance.subName._id;

        if (!attendanceByHostel[subName]) {
            attendanceByHostel[subName] = {
                present: 0,
                absent: 0,
                sessions: sessions,
                allData: [],
                subId: subId
            };
        }
        if (attendance.status === "Present") {
            attendanceByHostel[subName].present++;
        } else if (attendance.status === "Absent") {
            attendanceByHostel[subName].absent++;
        }
        attendanceByHostel[subName].allData.push({
            date: attendance.date,
            status: attendance.status,
        });
    });
    return attendanceByHostel;
}

export const calculateOverallAttendancePercentage = (hostelAttendance) => {
    let totalSessionsSum = 0;
    let presentCountSum = 0;
    const uniqueSubIds = [];

    hostelAttendance.forEach((attendance) => {
        const subId = attendance.subName._id;
        if (!uniqueSubIds.includes(subId)) {
            const sessions = parseInt(attendance.subName.sessions);
            totalSessionsSum += sessions;
            uniqueSubIds.push(subId);
        }
        presentCountSum += attendance.status === "Present" ? 1 : 0;
    });

    if (totalSessionsSum === 0 || presentCountSum === 0) {
        return 0;
    }

    return (presentCountSum / totalSessionsSum) * 100;
};