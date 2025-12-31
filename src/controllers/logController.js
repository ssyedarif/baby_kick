import {
  insertLog,
  findTodaySummary,
  findSummary,
  findSummaryWithHours,
  findLogging,
} from "../models/logModel.js";

export const createLog = async (req, res, next) => {
  try {
    await insertLog();

    res.status(201).json({
      success: "Logging Success!",
    });
  } catch (err) {
    next(err);
  }
};

export const getTodaySummary = async (req, res, next) => {
  try {
    const summary = await findTodaySummary();

    res.status(200).json({
      success: "Get Summary Success!",
      data: summary,
    });
  } catch (err) {
    next(err);
  }
};

export const getSummary = async (req, res, next) => {
  try {
    const date = req.query;

    if (!date) {
      return res.status(404).json({ fail: "MISSING DATE" });
    }

    const raw_date = date.date;

    const [day, month, year] = raw_date.split("/");
    const formattedDate = `${year}-${month}-${day}`;

    const summary = await findSummary(formattedDate);

    res.status(200).json({
      success: "Get Summary Success!",
      data: summary,
    });
  } catch (err) {
    next(err);
  }
};

export const getSummaryWithHours = async (req, res, next) => {
  try {
    const date = req.query;

    if (!date) {
      return res.status(404).json({ fail: "MISSING DATE" });
    }

    const raw_date = date.date;

    const [day, month, year] = raw_date.split("/");
    const formattedDate = `${year}-${month}-${day}`;

    const summary = await findSummaryWithHours(formattedDate);

    res.status(200).json({
      success: "Get Summary Success!",
      data: summary,
    });
  } catch (err) {
    next(err);
  }
};

export const getLogging = async (req, res, next) => {
  try {
    const date = req.query;

    if (!date) {
      return res.status(404).json({ fail: "MISSING DATE" });
    }

    const raw_date = date.date;

    const [day, month, year] = raw_date.split("/");
    const formattedDate = `${year}-${month}-${day}`;

    const logging = await findLogging(formattedDate);

    if (!logging || logging.length === 0) {
      return res.status(200).json({
        success: "No logging found",
        data: "No kicks recorded.",
      });
    }

    const formattedLogging = logging.map((item, index) => {
      const d = item.created_at;

      return {
        no: String(index + 1),
        kicked_at: `${String(d.getHours()).padStart(2, "0")}:${String(
          d.getMinutes()
        ).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`,
      };
    });

    res.status(200).json({
      success: "Get Logging Success!",
      data: formattedLogging,
    });
  } catch (err) {
    next(err);
  }
};
