const { Connection, Request } = require("tedious");
const moment = require("moment");

module.exports = (req, res) => {
  console.log(req.body);
  const VIC = [{ name: "Tullamarine", key: "406" }];

  const NSW = [
    { name: "Wagga Wagga", key: 407 },
    { name: "Tamworth", key: 413 },
    { name: "Newcastle", key: 403 },
    { name: "Milperra", key: 402 },
    { name: "Dubbo", key: 410 }
  ];
  const QLD = [
    { name: "Townsville", key: 409 },
    { name: "Rockhampton", key: 411 },
    { name: "Acacia Ridge", key: 399 }
  ];

  const WA = [{ name: "Perth", key: 405 }];

  const TAS = [
    { name: "Hobart", key: 408 },
    { name: "Launceston", key: 414 }
  ];

  const NT = [{ name: "Darwin", key: 412 }];

  const SA = [{ name: "Adelaide", key: 400 }];

  const ACT = [{ name: "Canberra", key: 401 }];

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
