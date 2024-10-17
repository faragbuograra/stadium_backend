import { NextFunction, Request, Response } from "express";



import { User } from "../Modules/Users/user.model";

import Department from "../Modules/Department/department.model";

import { raw } from "objection";
import moment from "moment";
import Management from "../Modules/Management/management.model";
import Procurement from "../Modules/Procurement/procurement.model";
import Companies from "../Modules/Companies/companies.model";


export const GetStatics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.query()
    .count()
    .then((rows: any) => Number(rows[0].count));

    const companies = await Companies.query()
    .count()
    .then((rows: any) => Number(rows[0].count));

    const management = await Management.query()
    .count()
    .then((rows: any) => Number(rows[0].count));
     const price = await Procurement.query()
    .sum('price')
    .then((rows: any) => Number(rows[0].sum));
    //create a new management department and procurement price for every new model created
    const priceStore = await Procurement.query()
    .sum('price')
    .where('management_idTo', 4)
    .then((rows: any) => Number(rows[0].sum))
    const statistic = await Procurement.query()
    .join('management', 'procurement.management_idTo', 'management.id')
  
    .select(
        'procurement.management_idTo',
        'management.name as management_name',
   
        raw('COUNT(*) as procurement_count')
    )
    .groupBy('procurement.management_idTo', 'management.name', );

// Group the results by management_idTo
const groupedStatistic = statistic.reduce((acc, obj) => {
    const { management_idTo, management_name, procurement_count } = obj;
    // If management_idTo doesn't exist in accumulator, initialize it
    if (!acc[management_idTo!]) {
        acc[management_idTo!] = [];
    }
    // Push department_id, department_name, and procurement_count into the management_idTo group
    acc[management_idTo!].push({ procurement_count , management_name });
    return acc;
}, {});

// Convert the grouped data into the desired format
const result = Object.keys(groupedStatistic).map((management_idTo) => {
  return {
      management_id: parseInt(management_idTo),
      management_name: groupedStatistic[management_idTo][0].management_name,
      procurement_count: groupedStatistic[management_idTo][0].procurement_count,
  };
});

  const statistics = {
   management:management,
   companies,
   priceStore:priceStore,
    users: users,
    price: price ,
    result
    //   mailto:mailStatistics,
  };

  res.json(statistics);
};
