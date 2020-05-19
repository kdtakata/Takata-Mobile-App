const { Connection, Request } = require("tedious");
const moment = require("moment");

module.exports = (req, res) => {
  console.log(req.body);
  const VIC = [{ name: "Tullamarine", key: "1" }];

  const NSW = [
    { name: "Wagga Wagga", key: "2" },
    { name: "Tamworth", key: "3" },
    { name: "Newcastle", key: "4" },
    { name: "Milperra", key: "5" },
    { name: "Dubbo", key: "6" }
  ];
  const QLD = [
    { name: "Townsville", key: "7" },
    { name: "Rockhampton", key: "8" },
    { name: "Acacia Ridge", key: "9" }
  ];

  const WA = [{ name: "Perth", key: "10" }];

  const TAS = [
    { name: "Hobart", key: "11" },
    { name: "Launceston", key: "15" }
  ];

  const NT = [{ name: "Darwin", key: "12" }];

  const SA = [{ name: "Adelaide", key: "13" }];

  const ACT = [{ name: "Canberra", key: "14" }];

  let datalog = {
    VIClist: VIC,
    NSWlist: NSW,
    QLDlist: QLD,
    WAlist: WA,
    TASlist: TAS,
    NTlist: NT,
    SAlist: SA,
    ACTlist: ACT
  };

  res.status(200).send(datalog);
};
